interface Image {
    readonly src: string;
    readonly alt: string;
}

interface Dimensions {
    readonly width: number;
    readonly height: number;
}

export interface ItemRecommendation {
    readonly src: string;
    readonly alt: string;
}

export interface Details {
    readonly dimensions: Dimensions;
    readonly size: number;
    readonly description: string;
    readonly recommendations: ItemRecommendation[];
}

export interface ProductModel {
    readonly name: string;
    readonly category: string;
    readonly price: number;
    readonly currency: string;
    readonly image: Image | null;
    readonly bestseller: boolean;
    readonly featured: boolean;
    readonly details: Details | null;
}

export interface PriceFilterModel {
    label: string,
    min: number,
    max: number
}
