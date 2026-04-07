use base64::{engine::general_purpose, Engine as _};
use ed25519_dalek::{Signature, Signer, SigningKey, VerifyingKey};
use rand::rngs::OsRng;
use std::env;
use std::path::PathBuf;
use tauri::{AppHandle, Manager};
use uuid::Uuid;

fn read_private_key_from_env() -> Option<SigningKey> {
    let key_b64 = env::var("LAUNCHER_AUTH_KEY").ok()?;
    let key_bytes = general_purpose::STANDARD.decode(key_b64).ok()?;
    if key_bytes.len() != 32 {
        return None;
    }
    Some(SigningKey::from_bytes(&key_bytes.try_into().unwrap()))
}

#[tauri::command]
pub fn get_public_key() -> Option<String> {
    let signing_key = read_private_key_from_env()?;
    let public_key = VerifyingKey::from(&signing_key);
    Some(general_purpose::STANDARD.encode(public_key.as_bytes()))
}

#[tauri::command]
pub fn sign_nonce(nonce_base64: String) -> Option<String> {
    let signing_key = read_private_key_from_env()?;
    let message = general_purpose::STANDARD.decode(nonce_base64).ok()?;
    let signature: Signature = signing_key.sign(&message);
    Some(general_purpose::STANDARD.encode(signature.to_bytes()))
}

#[tauri::command]
pub fn get_or_create_license_id(app: AppHandle) -> Result<String, String> {
    let app_dir: PathBuf = app
        .path()
        .app_config_dir()
        .map_err(|e| format!("could not get app_config_dir: {:?}", e))?;
    let id_file = app_dir.join("launcher_license_id.txt");

    if id_file.exists() {
        let s = std::fs::read_to_string(&id_file).map_err(|e| e.to_string())?;
        return Ok(s);
    }

    let uuid = Uuid::new_v4().to_string();
    std::fs::create_dir_all(&app_dir).map_err(|e| e.to_string())?;
    std::fs::write(&id_file, &uuid).map_err(|e| e.to_string())?;
    Ok(uuid)
}
