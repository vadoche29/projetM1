import os
import binascii

# Générer une clé secrète aléatoire de 64 octets (512 bits)
secret_key = binascii.hexlify(os.urandom(64)).decode()

print("SECRET_KEY:", secret_key)
