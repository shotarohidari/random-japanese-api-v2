import { loadEnvFile } from "node:process";
import OpenAI from "openai";
loadEnvFile("./.env");
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

export async function randomJPNames(howMany: number) {
	if (!Number.isInteger(howMany) || howMany <= 0)
		throw new Error("正しい数値を入力してください");
	if (howMany > 100) throw new Error("多すぎ");
	const chatCompletion = await openai.chat.completions.create({
		messages: [
			{
				role: "user",
				content: `日本人のフルネームを漢字で${howMany}人作ってください。出力はJSON形式で{names:string[]}の形式にしてください`,
			},
		],
		model: "gpt-3.5-turbo",
	});
	const stringfied = chatCompletion.choices[0].message.content;
	if (!stringfied) throw new Error("エラー。");
	const parsed = JSON.parse(stringfied);

	return parsed as { names: string[] };
}
