import 'reflect-metadata'

class Injector {
  private instances: object[] = [];

  public set<T>(constructor: Constructor<T>): void {
    const instance = new constructor();

    this.instances.push(instance);
  }

  public get(constructorType: Function) {
    const instance = this.instances.find(instance => instance instanceof constructorType);

    if (instance) {
      return instance;
    }

    throw new Error(`Injector: Unable to get ${constructorType}`);
  }
}

const injector = new Injector();

@Injectable
class Test {
  private test = 1;
}

@Injectable
class Test2 {
  private test2 = 2;
}

@Inject
class Test3 {
  // @ts-ignore
  constructor(@format private test2: Test3) {

  }
}

const test3 = new Test3({} as any);

type Constructor<T> = new(...args: any) => object & T;

export function Injectable<T>(constructor: Constructor<T>) {
  injector.set<T>(constructor);
}

const formatMetadataKey = Symbol("format");

function format(formatString: string) {
  // console.log(Reflect.getMetadata);
}
function getFormat(target: any, propertyKey: string) {
  // return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

export function Inject<T>(constructor: any) {
  console.log(constructor);
  // return injector.get(constructor);
}


