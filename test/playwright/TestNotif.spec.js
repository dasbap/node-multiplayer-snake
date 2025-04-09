const { test, expect } = require('@playwright/test');

test('Test des notifications de mort du joueur', async ({ page }) => {
    // Ouvrir l'application
    await page.goto('http://localhost:3000');

    // Simuler un scénario de mort (par exemple, en simulant une collision)
    await page.evaluate(() => {
        document.querySelector('#game-board').dispatchEvent(new Event('player-died'));
    });

    // Vérifier que la notification "You Died" est affichée
    const deathMessage = await page.locator('#kill-messages');
    await expect(deathMessage).toContainText('You died!');
});