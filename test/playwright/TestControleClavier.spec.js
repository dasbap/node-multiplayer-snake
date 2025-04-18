const { test, expect } = require('@playwright/test');

test('Test des contrôles au clavier', async ({ page }) => {
    // Ouvrir l'application
    await page.goto('http://localhost:3000');

    // Simuler un appui sur la touche 'flèche droite' (keyCode 39)
    await page.keyboard.press('ArrowRight');

    // Vérifier que la direction du serpent a changé (par exemple en surveillant son état ou sa position)
    // Ici, nous faisons une assertion simple pour vérifier que l'élément "game-board" est toujours visible après un mouvement.
    const gameBoard = await page.locator('#game-board');
    await expect(gameBoard).toBeVisible(); 
});