#!/bin/sh
export TITANIUM_PREFIX="_Prefix-*"
echo "Xcode Pre-Compile Phase: Removing $SHARED_PRECOMPS_DIR/$PROJECT$TITANIUM_PREFIX"
find "$SHARED_PRECOMPS_DIR" -name "$PROJECT$TITANIUM_PREFIX" -print0 | xargs -0 rm -rf
if [ "x$TITANIUM_CLI_XCODEBUILD" == "x" ]; then
    /usr/local/bin/node "/usr/local/bin/titanium" build --platform iphone --sdk "3.4.1.v20140929160915" --no-prompt --no-progress-bars --no-banner --no-colors --build-only --xcode
    exit $?
else
    echo "skipping pre-compile phase"
fi
