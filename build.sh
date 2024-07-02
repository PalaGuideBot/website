#!/bin/bash

# Fetch all branches from the remote repository

git fetch -a

# Pull the latest changes from the remote repository

git pull

# Vérifie si npm est installé
if ! command -v npm &> /dev/null
then
    echo "npm could not be found, please install it first."
    exit 1
fi

# Exécute la commande npm run build
echo "Running npm run build..."
npm run build

# Vérifie si la commande npm run build a réussi
if [ $? -ne 0 ]; then
    echo "npm run build failed, exiting script."
    exit 1
fi

# Vérifie si le fichier .env existe
if [ ! -f .env ]; then
    echo ".env file does not exist."
    exit 1
fi

# Vérifie si le dossier build existe
if [ ! -d build ]; then
    echo "build directory does not exist. Creating build directory."
    mkdir build
fi

# Copie le fichier .env dans le dossier build
echo "Copying .env to build directory..."
cp .env build/

# Restart the WEBSITE application using pm2
pm2 restart website

echo "Script completed successfully."