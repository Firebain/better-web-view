use serde_json::Value;
use serde::{Serialize, Deserialize};

/// The type of an incoming javascript request
#[derive(Deserialize, Debug)]
pub struct Request {
    pub hash: String,
    pub route: String,
    pub data: Value
}

/// A response to javascript
#[derive(Serialize, Debug)]
pub struct Response {
    hash: String,
    data: Result<Value, String>
}

impl Response {
    pub fn new(hash: String) -> Response {
        Response {
            hash,
            data: Ok(Value::Null)
        }
    }

    /// Successful
    pub fn data(&mut self, val: Value) {
        self.data = Ok(val);
    }

    // Err
    pub fn err(&mut self, err: String) {
        self.data = Err(err);
    }
}