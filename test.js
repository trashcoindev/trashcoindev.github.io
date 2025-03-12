// 简单的Playwright测试脚本
// 使用方法：安装Playwright后运行 npx playwright test test.js

const { test, expect } = require('@playwright/test');

test('基本功能测试', async ({ page }) => {
  // 打开网站
  await page.goto('file://' + __dirname + '/index.html');
  
  // 检查标题
  const title = await page.title();
  console.log('页面标题:', title);
  expect(title).toBe('Trash Coin – The Garbage You Deserve');
  
  // 检查主要元素是否存在
  const landingTitle = await page.textContent('.landing-title');
  console.log('主标题:', landingTitle);
  expect(landingTitle).toBe('Welcome to Trash Coin');
  
  // 检查按钮是否存在
  const buttonText = await page.textContent('.cta-button');
  console.log('按钮文本:', buttonText);
  expect(buttonText).toBe('Buy Trash Coin Now');
  
  // 检查路线图部分是否存在
  const roadmapTitle = await page.textContent('.roadmap-title');
  console.log('路线图标题:', roadmapTitle);
  expect(roadmapTitle).toBe('From Trash to Treasure');
  
  // 检查图像是否加载
  const images = await page.$$eval('img', imgs => imgs.map(img => img.src));
  console.log('图像数量:', images.length);
  expect(images.length).toBe(3); // 三个路线图图像
  
  // 检查垃圾掉落动画是否启动
  await page.waitForTimeout(3000); // 等待动画启动
  const trashItems = await page.$$('.trash-item');
  console.log('垃圾元素数量:', trashItems.length);
  expect(trashItems.length).toBeGreaterThan(0);
  
  // 检查背景图像是否加载
  const bodyStyle = await page.evaluate(() => {
    return window.getComputedStyle(document.body).backgroundImage;
  });
  console.log('背景图像:', bodyStyle);
  expect(bodyStyle).toContain('grunge-texture.webp');
  
  // 测试按钮点击
  page.on('dialog', async dialog => {
    console.log('对话框消息:', dialog.message());
    expect(dialog.type()).toBe('alert');
    await dialog.accept();
  });
  
  await page.click('.cta-button');
  
  // 截图
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  
  console.log('测试完成!');
});

// 测试响应式布局
test('响应式布局测试', async ({ page }) => {
  // 移动设备视图
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('file://' + __dirname + '/index.html');
  await page.screenshot({ path: 'screenshot-mobile.png' });
  
  // 检查移动设备上的样式
  const buttonWidth = await page.evaluate(() => {
    return window.getComputedStyle(document.querySelector('.cta-button')).width;
  });
  console.log('移动设备按钮宽度:', buttonWidth);
  expect(buttonWidth).toBe('200px');
  
  // 平板设备视图
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto('file://' + __dirname + '/index.html');
  await page.screenshot({ path: 'screenshot-tablet.png' });
  
  // 检查平板设备上的样式
  const tabletButtonWidth = await page.evaluate(() => {
    return window.getComputedStyle(document.querySelector('.cta-button')).width;
  });
  console.log('平板设备按钮宽度:', tabletButtonWidth);
  expect(tabletButtonWidth).toBe('250px');
  
  // 桌面视图
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('file://' + __dirname + '/index.html');
  await page.screenshot({ path: 'screenshot-desktop.png' });
  
  // 检查桌面设备上的样式
  const desktopButtonWidth = await page.evaluate(() => {
    return window.getComputedStyle(document.querySelector('.cta-button')).width;
  });
  console.log('桌面设备按钮宽度:', desktopButtonWidth);
  expect(desktopButtonWidth).toBe('300px');
  
  console.log('响应式测试完成!');
}); 