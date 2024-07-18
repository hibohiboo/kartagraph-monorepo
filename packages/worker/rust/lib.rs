use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
  #[wasm_bindgen(js_namespace = console)]
  fn log(s: &str);
}

#[wasm_bindgen]
pub fn console_log(message: &str) {
  log(message)
}

#[derive(Serialize, Deserialize)]
pub struct Monster {
  name: String,
  value: String,
}

#[wasm_bindgen]
pub fn return_new_monster(val: &JsValue) -> JsValue {
  let mut m: Monster = val.into_serde().unwrap();
  m.value = "new value".to_string();
  JsValue::from_serde(&m).unwrap()
}

#[wasm_bindgen]
pub fn return_js_value() -> JsValue {
  JsValue::NULL
}
