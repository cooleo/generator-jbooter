#!/bin/bash

#-------------------------------------------------------------------------------
# Force no insight
#-------------------------------------------------------------------------------
mkdir -p "$HOME"/.config/configstore/
mv "$JBOOTER_TRAVIS"/configstore/*.json "$HOME"/.config/configstore/

#-------------------------------------------------------------------------------
# Generate the project with yo jbooter
#-------------------------------------------------------------------------------
if [ "$JBOOTER" == "app-gateway-uaa" ]; then
    mkdir -p "$HOME"/uaa
    mv -f "$JBOOTER_SAMPLES"/uaa/.yo-rc.json "$HOME"/uaa/
    cd "$HOME"/uaa
    yarn link generator-jbooter
    yo jbooter --force --no-insight --yarn --with-entities
    ls -al "$HOME"/uaa
fi

mkdir -p "$HOME"/app
mv -f "$JBOOTER_SAMPLES"/"$JBOOTER"/.yo-rc.json "$HOME"/app/
cd "$HOME"/app
yarn link generator-jbooter
yo jbooter --force --no-insight --yarn --with-entities
