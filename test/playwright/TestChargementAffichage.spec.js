const { test, expect } = require('@playwright/test');

test('Page se charge correctement et affiche les éléments principaux', async ({ page }) => {
    // Ouvrir l'application
    await page.goto('http://localhost:3000');  // Remplace cette URL par celle de ton application

    // Vérifier que le titre de la page est "Snake"
    await expect(page).toHaveTitle('Snake');

    // Vérifier que l'élément de jeu est présent
    const gameBoard = await page.locator('#game-board');
    await expect(gameBoard).toBeVisible();

    // Vérifier que les notifications sont présentes
    const notifications = await page.locator('#notifications');
    await expect(notifications).toBeVisible();
});