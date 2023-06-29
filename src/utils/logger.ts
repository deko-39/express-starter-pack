import clc from 'cli-color'

class Logger {
  public errorColor = clc.red.bold
  public warnColor = clc.yellow
  public noticeColor = clc.blue
  public infoColor = clc.green

  public log(message: unknown): void {
    console.log(this.infoColor(message))
  }

  public error(message: unknown): void {
    console.log(this.errorColor(message))
  }

  public warn(message: unknown): void {
    console.log(this.warnColor(message))
  }

  public notice(message: unknown): void {
    console.log(this.noticeColor(message))
  }
}

const logger = new Logger()
export { logger }
