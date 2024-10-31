import { name as pkgName } from "../package.json";

export enum LogLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}
/**
 * 日志工具类
 *
 */
export class Logger {
  /**
   * 默认输出级别
   */
  private static outputLevel = LogLevel.DEBUG;
  /**
   * 设置日志输出级别，生产环境可以设置为WARN
   * @param level
   */
  public static setOutputLevel(level: LogLevel) {
    Logger.outputLevel = level;
  }

  /**
   * 格式化日志信息
   * @param level 输出级别
   * @param message 自定义内容
   * @param error 错误信息
   * @returns
   */
  private static formatMessage(
    level: LogLevel,
    message: string,
    error?: Error
  ) {
    return `[${pkgName}] [${level}]: ${message} ${error?.stack ?? ""}`;
  }

  /**
   * 获取日志级别元组
   */
  public static get logLevelTuple() {
    return Object.values(LogLevel);
  }

  public static log(level: LogLevel, message: string, error?: Error) {
    // 如果日志级别低于输出级别, 则不输出
    const isOutput =
      Logger.logLevelTuple.indexOf(level) >=
      Logger.logLevelTuple.indexOf(Logger.outputLevel);
    if (!isOutput) return;
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(Logger.formatMessage(LogLevel.DEBUG, message));
        break;
      case LogLevel.INFO:
        console.info(Logger.formatMessage(LogLevel.INFO, message));
        break;
      case LogLevel.WARN:
        console.warn(Logger.formatMessage(LogLevel.WARN, message));
        break;
      case LogLevel.ERROR:
        console.error(Logger.formatMessage(LogLevel.ERROR, message, error));
        break;
    }
  }

  public static debug(message: string) {
    Logger.log(LogLevel.DEBUG, message);
  }

  public static info(message: string) {
    Logger.log(LogLevel.INFO, message);
  }

  public static warn(message: string) {
    Logger.log(LogLevel.WARN, message);
  }

  public static error(message: string, error?: Error) {
    Logger.log(LogLevel.ERROR, message, error);
  }
}

/** 错误捕获，日志上报记录装饰器，用于方法上
 * @param isRecord 是否记录日志
 */
export function CatchError(isRecord = false) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const className = target.constructor.name;
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      try {
        return originalMethod.apply(this, args);
      } catch (error) {
        const msg = `(${className}]->[${propertyKey})方法执行出错`;
        Logger.error(msg, error as Error);
      }
    };
  };
}
