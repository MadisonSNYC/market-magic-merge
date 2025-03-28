# Security Guidelines for Market Mosaic

## Environment Variables

Environment variables are used to store sensitive configuration data like API keys, secrets, and database credentials. Follow these best practices to keep your environment variables secure:

### DO NOT:
- Commit `.env` files to git repositories
- Share your API keys in code reviews or chat applications
- Store private keys directly in `.env` files
- Publish screenshots containing environment variables
- Use production credentials in development environments

### DO:
- Use `.env.example` files with placeholder values
- Store production secrets in secure credential managers
- Rotate API keys periodically
- Use different API keys for development and production
- Follow the principle of least privilege for API keys

## Firebase Security

If using Firebase:
- Configure Security Rules properly for Firestore/RTDB
- Use Firebase App Check to prevent API abuse
- Set up proper authentication rules
- Monitor Firebase usage for unexpected patterns

## Handling Private Keys

For Kalshi API or other services requiring private keys:
- Store private keys in a secure credential manager
- Consider using a vault service (AWS Secrets Manager, HashiCorp Vault, etc.)
- For development, store private keys outside your project directory
- Use environment variables to point to the key file location, not to store the key itself

Example for loading private keys safely:
```typescript
import fs from 'fs';
import path from 'path';

function loadPrivateKey() {
  try {
    // Read from a secure location outside the project
    const keyPath = process.env.KALSHI_PRIVATE_KEY_PATH;
    
    if (!keyPath) {
      throw new Error('Private key path not configured');
    }
    
    return fs.readFileSync(path.resolve(keyPath), 'utf8');
  } catch (error) {
    console.error('Failed to load private key:', error);
    throw error;
  }
}
```

## Secret Rotation

Establish a process for rotating secrets:
1. Generate new credentials
2. Deploy the new credentials
3. Verify everything works with new credentials
4. Revoke old credentials

## Security Contacts

If you discover a security vulnerability, please contact:
- [Your contact info here] 