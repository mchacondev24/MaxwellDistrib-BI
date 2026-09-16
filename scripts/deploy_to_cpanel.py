"""
Uploader directo a cPanel FTP
Destino: /public_html/Portafolio/NicaDistrib-BI/
"""
import os
import ftplib
from pathlib import Path

FTP_HOST = os.getenv("CPANEL_FTP_HOST", "198.187.31.72")
FTP_USER = os.getenv("CPANEL_FTP_USER", "ingefknc")
FTP_PASS = os.getenv("CPANEL_FTP_PASS", "")
if not FTP_PASS and len(os.sys.argv) > 1:
    FTP_PASS = os.sys.argv[1]

BASE_TARGET = "/public_html/Portafolio/NicaDistrib-BI"
LOCAL_DIST = Path(__file__).resolve().parent.parent / "dist"

def sync_dir(ftp, local_path, remote_path):
    print(f"Sincronizando: {local_path} -> {remote_path}")
    ftp.cwd(remote_path)
    existing = ftp.nlst()

    for item in os.listdir(local_path):
        local_item = os.path.join(local_path, item)
        if os.path.isdir(local_item):
            if item not in existing:
                print(f"  [+] Creando carpeta remota: {item}")
                ftp.mkd(item)
            sync_dir(ftp, local_item, f"{remote_path}/{item}")
            ftp.cwd(remote_path)
        else:
            print(f"  [↑] Subiendo archivo: {item} ({os.path.getsize(local_item)} bytes)...")
            with open(local_item, "rb") as f:
                ftp.storbinary(f"STOR {item}", f)

def main():
    print(f"Conectando a {FTP_HOST}...")
    ftp = ftplib.FTP(timeout=30)
    ftp.connect(FTP_HOST, 21)
    ftp.login(FTP_USER, FTP_PASS)
    print("Login correcto.")

    sync_dir(ftp, str(LOCAL_DIST), BASE_TARGET)

    ftp.cwd(BASE_TARGET)
    print("\n=== Contenido final en /public_html/Portafolio/NicaDistrib-BI ===")
    for item in ftp.nlst():
        print(" -", item)

    ftp.quit()
    print("\nDespliegue finalizado con éxito!")

if __name__ == "__main__":
    main()
