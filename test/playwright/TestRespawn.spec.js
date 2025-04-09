const { test, expect } = require('@playwright/test');

test('Test de la déconnexion et du respawn', async ({ page }) => {
    // Ouvrir l'application
    await page.goto('http://localhost:3000');

    // Simuler un appui sur la touche 'flèche droite' pour déplacer le serpent
    await page.keyboard.press('ArrowRight');

    // Simuler une collision avec un mur (tu devras adapter cela en fonction de ta logique de collision)
    // Tu peux utiliser un événement de "collision" ou forcer un changement d'état
    await page.evaluate(() => {
        // Simuler la fin du jeu par collision
        document.querySelector('#game-board').dispatchEvent(new Event('game-over'));
    });

    // Vérifier que le joueur respawn
    const respawnButton = await page.locator('#respawn-button');  // Suppose que tu as un bouton de respawn
    await expect(respawnButton).toBeVisible();
    await respawnButton.click();  // Simuler un clic sur "Respawn"

    // Vérifier que le jeu recommence et que l'état est réinitialisé
    await expect(page.locator('#game-board')).toBeVisible();
});