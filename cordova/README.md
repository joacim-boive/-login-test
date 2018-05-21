# Cordova

Build an app ... bla bla bla ...

# Preparation

## Install Cordova

    npm install -g cordova

## Prepare and run

Clone ecster-login repo

    git clone https://:@xsebyggp002.se.shb.biz/scm/ecster/ecster-login.git

Prepare cordova

    cd ecster-login/cordova
    cordova prepare

Build and run

    cd ..
    npm run build-debug   (or build)
    npm run cordova       (cordova => browser device)
    npm run ios           (ios => on a Mac, ios device or simulator)
    npm run android       (android => android device or simulator)


# First setup log

What was done initially to set up the cordova part of the project?

    cd ecster-login/
    cordova create cordova se.ecster.login EcsterLogin
    cd cordova/
    cordova platform add browser
    cordova platform add android
    cordova platform add ios

Add

    <allow-intent href="bankid:*" /> 

to config.xml


# Cordova copyright

Copyright notes for Cordova generated code has been removed from files 

Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
