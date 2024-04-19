const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logDir = "/usr/src/logs";
const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(
		winston.format.timestamp({
			format: "YYYY-MM-DD HH:mm:ss",
		}),
		winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
	),
	transports: [
		//* info 레벨 로그를 저장할 파일 설정 (info: 2 보다 높은 error: 0 와 warn: 1 로그들도 자동 포함해서 저장)
		new winstonDaily({
			level: "info", // info 레벨에선
			datePattern: "YYYY-MM-DD", // 파일 날짜 형식
			dirname: logDir, // 파일 경로
			filename: `%DATE%.log`, // 파일 이름
			maxFiles: 30, // 최근 30일치 로그 파일을 남김
			zippedArchive: true, // 아카이브된 로그 파일을 gzip으로 압축할지 여부
		}),
		//* error 레벨 로그를 저장할 파일 설정 (info에 자동 포함되지만 일부러 따로 빼서 설정)
		new winstonDaily({
			level: "error", // error 레벨에선
			datePattern: "YYYY-MM-DD",
			dirname: logDir + "/error", // /logs/error 하위에 저장
			filename: `%DATE%.error.log`, // 에러 로그는 2020-05-28.error.log 형식으로 저장
			maxFiles: 30,
			zippedArchive: true,
		}),
	],

	//* uncaughtException 발생시 파일 설정
	exceptionHandlers: [
		new winstonDaily({
			level: "error",
			datePattern: "YYYY-MM-DD",
			dirname: logDir,
			filename: `%DATE%.exception.log`,
			maxFiles: 30,
			zippedArchive: true,
		}),
	],
});

// if (process.env["PROFILE_VERSION"] !== "prod") {
// 	logger.add(
// 		new winston.transports.Console({
// 			format: winston.format.combine(
// 				winston.format.colorize(), // log level별로 색상 적용하기
// 				winston.format.simple() // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
// 			),
// 		})
// 	);
// }

module.exports = logger;
