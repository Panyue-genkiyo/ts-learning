let a = 133 as const;

type b = typeof a;

let ts: b = 133; //类型就只是133

let a2 = [1,'sss', true, a]; // (string | boolean | number)[]

let a3 = [1,'sss', true, a] as const;  // [1，‘sss’, true  133]元组 readonly

let a4: typeof a3 = [1, 'sss', true, 133] // [1]