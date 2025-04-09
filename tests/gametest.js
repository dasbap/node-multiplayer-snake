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

test('Test des contrôles au clavier', async ({ page }) => {
    // Ouvrir l'application
    await page.goto('http://localhost:3000');

    // Simuler un appui sur la touche 'flèche droite' (keyCode 39)
    await page.keyboard.press('ArrowRight');

    // Vérifier que la direction du serpent a changé (par exemple en surveillant son état ou sa position)
    // Ici, nous faisons une assertion simple pour vérifier que l'élément "game-board" est toujours visible après un mouvement.
    const gameBoard = await page.locator('#game-board');
    await expect(gameBoard).toBeVisible(); // Tu peux remplacer cette vérification par une vérification de l'état du serpent.
});
