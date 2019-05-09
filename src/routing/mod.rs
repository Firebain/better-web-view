pub mod messages;

use std::collections::HashMap;
use std::marker::PhantomData;

use crate::{WebView, WVResult};
use self::messages::{Request, Response};

use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct TryHash {
    pub hash: String,
}

type Callback = fn(Request, Response) -> Response;

/// The type for defining routes. The router determine which callback is executed when 
/// receives a javascript request. Accepts an interop key and a responding callback
/// # Example
/// ```no_run
/// 
/// mod controllers
/// 
/// use web_view::*;
/// use controllers::counter;
/// 
/// fn main() {
///     let router = Router::default();
/// 
///     router.add("counter/get5", counter::get5);
///     router.add("counter/get10", counter::get10);
/// }
pub struct Router<'a, T: 'a> {
    routes: HashMap<&'a str, Callback>,
    _phantom: PhantomData<T>
}

impl<'a, T: 'a> Default for Router<'a, T> {
    fn default() -> Router<'a, T> {
        Router {
            routes: HashMap::new(),
            _phantom: PhantomData
        }
    } 
}

impl<'a, T: 'a> Router<'a, T> {
    pub fn new() -> Self {
        Router::default()
    }

    /// Adding a key and a callback to the route list
    pub fn add(&mut self, key: &'a str, callback: Callback) {
        self.routes.insert(key, callback);
    }

    pub fn resolve(&self, webview: &mut WebView<T>, arg: &str) -> WVResult {
        let msg = serde_json::from_str(arg);

        if let Err(_) = msg {
            let try_hash = serde_json::from_str(arg);

            if let Err(_) = try_hash {
                return Ok(())
            }

            let try_hash: TryHash = try_hash.unwrap();

            self.err_callback(try_hash.hash, "Wrong format".to_string(), webview);

            return Ok(())
        }

        let req: Request = msg.unwrap();

        let res = Response::new(req.hash.clone());

        let route = self.get(&req.route);

        if let Some(route) = route {
            let res = route(req, res);

            let json = serde_json::to_string(&res).unwrap();

            webview
                .eval(&format!("external.backend.handle({})", json))
                .unwrap();
        } else {
            self.err_callback(req.hash, "Route is not found".to_string(), webview)
        }

        Ok(())
    }

    fn err_callback(&self, hash: String, msg: String, webview: &mut WebView<T>) {
        let mut response = Response::new(hash);

        response.err(msg);

        let json = serde_json::to_string(&response).unwrap();

        webview
            .eval(&format!("external.backend.handle({})", json))
            .unwrap();
    }   

    pub fn get(&self, key: &'a str) -> Option<&Callback> {
        self.routes.get(key)
    }
}