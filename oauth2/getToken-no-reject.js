/**
 * @license
 * Code City Node.js Login Server
 *
 * Copyright 2017 Google Inc.
 * https://github.com/NeilFraser/CodeCity
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Node.js server that provides Google auth services to Code City.
 * @author fraser@google.com (Neil Fraser)
 */

// Start with: node loginServer.js
'use strict';

const fs = require('fs');
const google = require('googleapis');

const CFG = JSON.parse(fs.readFileSync('loginServer.cfg', 'utf8'));
const oauth2Client = new google.auth.OAuth2(
    CFG.clientId, CFG.clientSecret, CFG.redirectUri);

(async function() {
  try {
    const tokens = await oauth2Client.getToken('invalid');
  } catch (err) {
    console.log('ERROR1:', err);
  }

  oauth2Client.getToken('invalid', (err, tokens) => {
    if (err) {
      console.log('ERROR2:', err);
    }
  });
})();
