#!/bin/bash

# Directorio de la copia de seguridad
DB_DIR="/media/smbfolder/backup24"

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

# Eliminar la carpeta de backup
rm -rf "$BACKUP_DIR"
