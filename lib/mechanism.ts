export type Topology = 'serial' | 'parallel';
export type MechanismInputs = { designDays: number; testDays: number; designSpeed: number; testSpeed: number; addedTime: number; topology: Topology; capacities: [number,number,number]; capacityMultipliers: [number,number,number] };
export const DEFAULT_INPUTS: MechanismInputs = { designDays:8,testDays:32,designSpeed:4,testSpeed:1,addedTime:0,topology:'serial',capacities:[10,4,6],capacityMultipliers:[4,1,1] };
export function calculateMechanism(input: MechanismInputs) {
  const values=[input.designDays,input.testDays,input.designSpeed,input.testSpeed,...input.capacities,...input.capacityMultipliers];
  if (values.some(n=>!Number.isFinite(n)||n<=0) || !['serial','parallel'].includes(input.topology)) throw new Error('Inputs must be finite positive numbers and a supported topology');
  if (!Number.isFinite(input.addedTime) || input.addedTime<0) throw new Error('Additional work must be finite and nonnegative');
  const combine=input.topology==='serial' ? (a:number,b:number)=>a+b : Math.max;
  const before=combine(input.designDays,input.testDays);
  const design=input.designDays/input.designSpeed, testing=input.testDays/input.testSpeed;
  const after=combine(design,testing)+input.addedTime;
  const changedCapacities=input.capacities.map((c,i)=>c*input.capacityMultipliers[i]);
  const outputAfter=Math.min(...changedCapacities);
  return {before,after,design,testing,saved:before-after,speedRatio:before/after,reductionPercent:100*(before-after)/before,change:after<before?'shorter':after>before?'longer':'unchanged',outputBefore:Math.min(...input.capacities),outputAfter,changedCapacities,bindingStations:changedCapacities.flatMap((value,i)=>value===outputAfter?[i]:[])};
}
