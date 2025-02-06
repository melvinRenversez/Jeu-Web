import numpy as np
import matplotlib.pyplot as plt

# Génération du temps
t = np.linspace(0, 10, 500)

# Fonction de base : tendance exponentielle
trend = np.exp(0.1 * t)

# Oscillations simulant la volatilité
oscillation = np.sin(2 * np.pi * t * 0.3) * 0.5

# Bruit aléatoire
noise = np.random.normal(0, 0.3, len(t))

# Fonction finale
crypto_like_function = trend + oscillation + noise

# Affichage
plt.plot(t, crypto_like_function, label="Simulation Crypto")
plt.legend()
plt.xlabel("Temps")
plt.ylabel("Valeur")
plt.title("Évolution d'une valeur comme une cryptomonnaie")
plt.show()
