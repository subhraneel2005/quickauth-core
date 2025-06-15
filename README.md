# 🧠 kasukabe-auth-core

> Reusable, framework-agnostic authentication utilities for Node.js apps.  
> Built from the core of [`kasukabe-quickauth`](https://www.npmjs.com/package/kasukabe-quickauth) — extracted for flexibility and ease of use.

---

![cat auth meme](https://media.giphy.com/media/ZqlvCTNHpqrio/giphy.gif)

---

## 🔧 Features

- 🔐 Password hashing & comparison (using `bcryptjs`)
- 🔑 JWT access & refresh token generation
- 🌐 Google OAuth2 login helper (with token exchange + user info fetch)
- 🍪 Cookie-based token sender for Express

---

## 📦 Installation

```bash
npm install kasukabe-quickauth-core
```

### 📂 What's Inside?

---

#### 🔐 Password Utilities

```javascript
import { encryptPassword, comparePassword } from "kasukabe-auth-core";

// Encrypt a password
const hash = await encryptPassword("my-secret-password");

// Compare plaintext with hashed password
const isValid = await comparePassword("my-secret-password", hash);
```

---

#### 🔑 JWT Token Utilities

```javascript
import { generateAccessToken, generateRefreshToken } from "kasukabe-auth-core";

const access = generateAccessToken(user.id);
const refresh = generateRefreshToken(user.id);
```

Requires these environment variables:

```
ACCESS_SECRET=your_secret_key
REFRESH_SECRET=your_refresh_secret
```

---

#### 🌐 Google OAuth Utilities

```javascript
import { getGoogleAuthUrl, getGoogleUser } from "kasukabe-auth-core";

// 1. Redirect to Google login
const url = getGoogleAuthUrl();

// 2. After redirect, exchange code for user info
const userData = await getGoogleUser(code);
```

Requires:

```
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

---

#### 🍪 sendToken Helper (Express)

```javascript
import { sendToken } from "kasukabe-auth-core";

sendToken(res, accessToken, refreshToken, "Logged in successfully");
```

Handles development/production cookie setup smartly.

## 📄 License

MIT © [Subhraneel Goswami](https://github.com/subhraneel2005)

  <p><strong>Don't forget to ⭐ star this repo if it helped you!</strong></p>
  
  [![GitHub stars](https://img.shields.io/github/stars/subhraneel2005/quickauth-core.svg?style=social&label=Star)](https://github.com/subhraneel2005/quickauth-core)
  
</div>
