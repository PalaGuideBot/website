#!/bin/bash

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

echo "Script completed successfully."