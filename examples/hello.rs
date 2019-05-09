use better_web_view as web_view;

fn main() {
    let html = format!(r#"
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Hello example</title>
            </head>
            <body>
                {scripts}
            </body>
        </html>
        "#,
        scripts = format!(r#"<script type="text/javascript">{}</script>"#, include_str!("js/app.js"))
    );

    let mut router = web_view::Router::new();
    router.add("say_hello", say_hello);

    let webview = web_view::builder()
        .title("Hello example")
        .content(web_view::Content::Html(html))
        .size(800, 600)
        .resizable(true)
        .debug(true)
        .user_data(0)
        .router(router)
        .build()
        .unwrap();

    webview.run().unwrap();
}

fn say_hello(req: web_view::Request, mut res: web_view::Response) -> web_view::Response {
    if let web_view::Value::String(name) = req.data {
        let hello = format!("Hello {}!", name);

        res.data(web_view::json!(hello));

        return res;
    }

    res.err(String::from("Invalid argument"));

    res
}