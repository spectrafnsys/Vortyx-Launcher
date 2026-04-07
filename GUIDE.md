Install rust (rust-lang.org)
Install bun (bun.sh)
Install Node.js (nodejs.org)

after installing, configure ur launcher in env
change the logo in public/ and src-tauri -> icons

go to src-tauri -> tauri.conf.json

change the name and version to your choice, etc.
finally,

Open terminal

Run the following commands
bun install
bun tauri dev (to test)
bun tauri build (to release)

After you run bun tauri build you should see your msi installer in src-tauri/target/release/bundle/msi
