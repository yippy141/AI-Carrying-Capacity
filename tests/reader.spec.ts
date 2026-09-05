import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {mkdirSync,readFileSync} from 'node:fs';
const shots='reports/reader-edition/screenshots';
test('home → empirical figure → source and denominator caveat',async({page},info)=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 const response=await page.goto('/');
 expect(response?.headers()['x-content-type-options']).toBe('nosniff');
 expect(response?.headers()['x-robots-tag']).toContain('noindex');
 expect(response?.headers()['content-security-policy']).toContain("frame-ancestors 'none'");
 await expect(page.getByRole('heading',{level:1})).toHaveText('Frontier Is Not Fate');
 await page.getByRole('link',{name:'Follow the visual study'}).click();
 await expect(page.locator('#figure-1')).toBeVisible();
 await expect(page.locator('#figure-1')).not.toContainText('16.4%');
 await page.getByRole('link',{name:'ECB SAFE Q4 2025 — source and caveat'}).click();
 await expect(page).toHaveURL(/evidence#adoption-ecb$/);
 await expect(page.locator('#adoption-ecb')).toContainText('5,067');
 await expect(page.locator('#adoption-ecb')).toContainText('98%');
 await expect(page.locator('#adoption-ecb a').first()).toHaveAttribute('href','https://www.ecb.europa.eu/stats/ecb_surveys/safe/html/ecb.safe202602.en.html');
 await expect(page.locator('#adoption-ecb table')).toContainText('33%');
 expect(errors).toEqual([]);
 mkdirSync(shots,{recursive:true});await page.screenshot({path:`${shots}/${info.project.name}-evidence.png`,fullPage:false});
});
test('assumptions change arithmetic, bottleneck and topology; keyboard and reset work',async({page})=>{
 await page.goto('/#mechanism');
 await expect(page.getByTestId('project-result')).toContainText('40 → 34 days');
 await expect(page.getByTestId('output-result')).toContainText('4 → 4 accepted units/week');
 const design=page.getByRole('slider',{name:/^Design speed/});await design.focus();await design.press('ArrowRight');
 await expect(page.getByTestId('project-result')).toContainText('40 → 33.6 days');
 await page.getByRole('button',{name:'Reset assumptions'}).click();
 await page.getByRole('radio',{name:'Parallel: independent tasks, both required'}).check();
 await expect(page.getByTestId('project-result')).toContainText('32 → 32 days');
 await page.getByRole('button',{name:'Also make testing 4× as fast'}).click();
 await expect(page.getByTestId('project-result')).toContainText('32 → 8 days');
 const second=page.getByRole('slider',{name:/Second station capacity multiplier/});await second.fill('4');
 await expect(page.getByTestId('output-result')).toContainText('4 → 6 accepted units/week');
 await page.getByRole('button',{name:'Reset assumptions'}).click();
 await expect(page.getByTestId('project-result')).toContainText('40 → 34 days');
 await expect(design).toHaveValue('4');
 await page.getByRole('button',{name:'What would change this? A useful plant outcome'}).click();
 await expect(page.locator('.trace-answer')).toContainText('defensible counterfactual');
});
test('paper, print, source links, static text and mobile overflow',async({page},info)=>{
 await page.goto('/paper');
 await expect(page.locator('figure')).toHaveCount(4);
 await expect(page.locator('#author-draft')).toHaveAttribute('open','');
 const before=await page.locator('[data-claim-id]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('data-claim-id')));
 await page.goto('/');
 expect(await page.locator('[data-claim-id]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('data-claim-id')))).toEqual(before);
 for(const route of ['/','/paper','/evidence','/about','/methods','/findings']){
  await page.goto(route);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  const checks=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(checks.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
 }
 await page.goto('/paper');await page.emulateMedia({media:'print'});
 await expect(page.locator('header')).toBeHidden();
 await expect(page.getByTestId('project-result')).toContainText('8/4 + 32/1 = 34 days');
 await expect(page.locator('.print-only').first()).toBeVisible();
 if(info.project.name==='desktop')await page.pdf({path:'reports/reader-edition/reader-print.pdf',format:'A4',printBackground:true,tagged:true});
 await page.emulateMedia({media:'screen'});
 if(info.project.name==='mobile')expect(await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
});
test('figure exports and actual rendered screenshots',async({page},info)=>{
 await page.goto('/');await page.evaluate(()=>document.fonts.ready);
 const requests:string[]=[];page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:3000')&&!/^(data|blob):/.test(r.url()))requests.push(r.url());});
 for(const format of ['SVG','PNG']){
  const download=page.waitForEvent('download');await page.locator('#figure-1').getByRole('button',{name:format,exact:true}).click();
  const item=await download;expect(item.suggestedFilename()).toBe(`reported-ai-use.${format.toLowerCase()}`);
  const local=await item.path();expect(local).not.toBeNull();expect(readFileSync(local!).length).toBeGreaterThan(1000);
  if(format==='SVG')expect(readFileSync(local!,'utf8')).not.toContain('16.4%');
 }
 mkdirSync(shots,{recursive:true});await page.evaluate(()=>window.scrollTo(0,0));
 await page.screenshot({path:`${shots}/${info.project.name}.png`});
 await page.screenshot({path:`${shots}/${info.project.name}-study.png`,fullPage:true});
 await page.locator('#figure-3').screenshot({path:`${shots}/${info.project.name}-mechanism.png`});
 await page.locator('#figure-2').screenshot({path:`${shots}/${info.project.name}-outcomes.png`});
 expect(requests).toEqual([]);
});
test('reading links resolve, archive routes remain usable, no secret-profile dump',async({page,request})=>{
 await page.goto('/');
 const links=await page.locator('main a[href^="/"]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')!));
 for(const link of [...new Set(links)]){
  const response=await request.get(link.split('#')[0]||'/');expect(response.ok(),link).toBe(true);
 }
 for(const route of ['/lab','/forecasts','/scenarios','/sources','/sectors/manufacturing','/sectors/compute-energy'])expect((await request.get(route)).ok(),route).toBe(true);
 expect((await request.get('/data/profiles/stage_profiles.csv')).status()).toBe(404);
 await page.goto('/');await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();
});

test('all new figure exports retain caveats and noninteractive page retains default argument',async({page,browser})=>{
 await page.goto('/');
 for(const number of [2,3,4]){
  const pending=page.waitForEvent('download');await page.locator(`#figure-${number}`).getByRole('button',{name:'PNG',exact:true}).click();
  const download=await pending;const filename=await download.path();expect(readFileSync(filename!).length).toBeGreaterThan(1000);
  await expect(page.locator(`#figure-${number}`)).not.toContainText('export failed');
 }
 const context=await browser.newContext({javaScriptEnabled:false});const staticPage=await context.newPage();
 await staticPage.goto('http://127.0.0.1:3000/');
 await expect(staticPage.getByTestId('project-result')).toContainText('40 → 34 days');
 await expect(staticPage.locator('#figure-2')).toContainText('February 2026 update');
 await expect(staticPage.locator('#figure-4')).toContainText('real research tokamak');
 await context.close();
});
