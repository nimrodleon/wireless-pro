#!/bin/bash

# Directorio de la copia de seguridad
DB_DIR="/home/ubuntu/backup24"

# Nombre de la carpeta de backup (formato fecha)
BACKUP_DIR_NAME=$(date +"%d-%m-%Y")

# Directorio completo para la copia de seguridad actual
BACKUP_DIR="$DB_DIR/$BACKUP_DIR_NAME"

# Archivo comprimido
ZIP_FILE="$DB_DIR/$BACKUP_DIR_NAME.zip"

# Crear el directorio de la copia de seguridad
mkdir -p "$BACKUP_DIR"

# Ejecutar mongodump en el directorio de la copia de seguridad
mongodump --out "$BACKUP_DIR"

# Comprimir la carpeta resultante con zip
zip -r "$ZIP_FILE" "$BACKUP_DIR"

# Subir a Google Drive con rclone
rclone sync "$ZIP_FILE" google-drive:/backup24

# Eliminar la carpeta de backup y el archivo comprimido después de la sincronización
rm -rf "$BACKUP_DIR" "$ZIP_FILE"
