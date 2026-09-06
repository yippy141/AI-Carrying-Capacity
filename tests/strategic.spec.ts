import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {mkdirSync} from 'node:fs';
const shots='reports/strategic-futures/screenshots';
test('strategic question, consequential assumptions and a legible pinned comparison',async({page},info)=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await page.evaluate(()=>document.fonts.ready);
 await expect(page.getByRole('heading',{level:1})).toHaveText('When does an AI lead become lasting power?');
 await expect(page.locator('.strategic-opening')).toContainText('US–China');
 await expect(page.getByTestId('strategic-result')).toContainText('protected research lead can compound');
 mkdirSync(shots,{recursive:true});await page.screenshot({path:`${shots}/${info.project.name}-opening.png`});
 await page.locator('#strategic-canvas').screenshot({path:`${shots}/${info.project.name}-canvas-before.png`});
 expect(await page.locator('.map-deployment').evaluate(el=>el.getBoundingClientRect().bottom)).toBeLessThan(await page.locator('.redesign-link').evaluate(el=>el.getBoundingClientRect().top));
 const geometry=await page.locator('.map-us').evaluate(el=>({width:el.clientWidth,left:getComputedStyle(el).left,top:getComputedStyle(el).top}));
 await page.getByLabel('Useful capability reaches rivals').selectOption('broad');
 await expect(page.getByTestId('strategic-result')).toContainText('Exclusive leverage weakens');
 await expect(page.getByTestId('strategic-result')).toContainText('gains remain concentrated');
 await page.getByLabel('AI changes the production path').selectOption('existing');
 await expect(page.getByTestId('changed-count')).toContainText('2 assumptions changed');
 await expect(page.locator('#future-comparison')).toContainText('different physical pathway becomes available');
 await expect(page.locator('#future-comparison')).toContainText('qualification remain separate');
 expect(await page.locator('.map-us').evaluate(el=>({width:el.clientWidth,left:getComputedStyle(el).left,top:getComputedStyle(el).top}))).toEqual(geometry);
 await page.locator('#strategic-canvas').screenshot({path:`${shots}/${info.project.name}-canvas-changed.png`});
 await page.locator('#future-comparison').screenshot({path:`${shots}/${info.project.name}-comparison.png`});
 await page.getByRole('button',{name:'Pin current case as “before”'}).click();
 await expect(page.getByTestId('changed-count')).toContainText('Starting case pinned');
 await page.getByLabel('Investment and political bargain').selectOption('broad');
 await expect(page.getByTestId('strategic-result')).toContainText('benefit channel is stipulated');
 await page.getByRole('button',{name:'Reset the comparison'}).click();
 await expect(page.getByTestId('strategic-result')).toContainText('protected research lead can compound');
 await page.getByLabel('Research feedback').focus();await page.keyboard.press('b');
 await expect(page.getByLabel('Research feedback')).toHaveValue('bounded');
 await expect(page.locator('.map-research')).toContainText('no assumed recursive loop');
 await page.getByRole('button',{name:'Reset the comparison'}).click();
 await page.screenshot({path:`${shots}/${info.project.name}-full-study.png`,fullPage:true});
 expect(errors).toEqual([]);
});
test('four proposed futures and interruption change topology, control and priorities',async({page},info)=>{
 await page.goto('/#explorer');
 for(const [name,expected] of [
  ['Capability spreads','benefit channel is stipulated'],
  ['Powerful systems, divided societies','gains remain concentrated'],
  ['Coordinated limits and missions','contested compact'],
  ['The lead compounds','protected research lead can compound']]){
  await page.getByRole('button',{name,exact:true}).click();
  await expect(page.getByTestId('strategic-result')).toContainText(expected);
 }
 await page.getByRole('button',{name:'Coordinated limits and missions',exact:true}).click();
 await expect(page.locator('.map-research')).toContainText('permitted work');
 await expect(page.locator('.future-budget')).toContainText('Deferred at the margin: Unrestricted frontier experiments');
 await page.getByRole('button',{name:'Do institutions deliver their side of the bargain?'}).click();
 await expect(page.locator('.checkpoint-answer')).toContainText('Covert development');
 await page.locator('#strategic-canvas').screenshot({path:`${shots}/${info.project.name}-compact.png`});
 await page.getByLabel('Investment and political bargain').selectOption('rupture');
 await expect(page.getByTestId('strategic-result')).toContainText('unassessable');
 await expect(page.locator('.map-research')).toContainText('Loop interrupted');
 await page.locator('#strategic-canvas').screenshot({path:`${shots}/${info.project.name}-interruption.png`});
});
test('source types, shared paper, accessible mobile and no-JavaScript defaults',async({page,browser,request},info)=>{
 await page.goto('/assumptions');
 await expect(page.locator('#sf-china')).toContainText('Draft translation');
 await expect(page.locator('#sf-china a')).toHaveAttribute('href',/nda.gov.cn/);
 await expect(page.locator('#sf-ai2027')).toContainText('forecasts, not observations');
 await expect(page.locator('#sf-ai2040')).toContainText('not the authors’ unconditional best guess');
 for(const route of ['/','/paper','/assumptions','/work','/work/paper','/evidence','/methods','/about','/findings']){
  await page.goto(route);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route).toBe(true);
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),route).toEqual([]);
 }
 await page.goto('/');await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();
 const links=await page.locator('main a[href^="/"]').evaluateAll(ns=>ns.map(n=>n.getAttribute('href')!));
 for(const link of new Set(links)){const response=await request.get(link.split('#')[0]||'/');expect(response.ok(),link).toBe(true);}
 await page.goto('/paper');await page.emulateMedia({media:'print'});
 await expect(page.locator('header')).toBeHidden();await expect(page.locator('#strategic-canvas')).toBeVisible();
 await expect(page.locator('.future-trajectory details')).toHaveAttribute('open','');
 if(info.project.name==='desktop')await page.pdf({path:'reports/strategic-futures/strategic-print.pdf',format:'A4',printBackground:true,tagged:true});
 await page.emulateMedia({media:'screen'});
 if(info.project.name==='mobile')expect(await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
 const context=await browser.newContext({javaScriptEnabled:false});const staticPage=await context.newPage();await staticPage.goto('http://127.0.0.1:3000/');
 await expect(staticPage.getByTestId('strategic-result')).toContainText('lead can compound');
 await expect(staticPage.locator('.future-trajectory')).toContainText('chosen starting premise');
 await expect(staticPage.locator('.static-future-note')).toContainText('without JavaScript');
 await context.close();
});
