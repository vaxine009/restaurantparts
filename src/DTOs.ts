import { double } from "aws-sdk/clients/lightsail";

export class CategoriesDto {
	id: number;
	sname: string;
	content: string;
	simage: string;
}

export class PartsDetailsDto {
	id: number;
	description: string;
	category: string;
	quantity: number;
	price: double;
	mainPicture: string;
	picture2: string;
	picture3: string;
	picture4: string;
	picture5: string;
}