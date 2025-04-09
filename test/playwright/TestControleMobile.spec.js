const { test, expect } = require('@playwright/test');

test('Test des contrôles mobiles', async ({ page }) => {
    // Configurer un viewport mobile (par exemple iPhone 6)
    await page.setViewportSize({ width: 375, height: 667 });

    // Ouvrir l'application en mode mobile
    await page.goto('http://localhost:3000');

    // Vérifier que les contrôles mobiles sont visibles
    const mobileControls = await page.locator('#mobile-controls');
    await expect(mobileControls).toBeVisible();

    // Cliquer sur le bouton "↑"
    const btnUp = await page.locator('#btn-up');
    await btnUp.click();

    // Vérifier que l'événement est émis (simule l'élément ou la réponse du serpent)
    // Tu peux ajouter une vérification selon la logique de ton jeu ici, par exemple vérifier un changement d'état.
    await expect(page.locator('#game-board')).toBeVisible();
});