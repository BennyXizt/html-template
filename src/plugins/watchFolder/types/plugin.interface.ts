export interface FFmpegProgressInterface {
  frames?: number;
  currentFps?: number;
  currentKbps?: number;
  targetSize?: number;
  timemark?: string;
  percent?: number;
}
export interface VideoFolderInterface {
    relativePath: string,
    outputVideoDirectory?: string,
    posterDirectory?: string,
    language?: Language
    outputVideoFormat?: Video[]
}
export interface SVGFolderInterface {
    relativePath: string,
    nameOfTheOutputFile: string,
    language?: Language,
    dummy?: {
        destination: string,
        fileName: string
    }
}
export interface FontsFolderInterface {
    relativePath: string,
    outputDestination: string,
    language?: Language
}
export interface EJSFolderDestination {
    root?: {
        fileName: string,
        fileDestination: string
    },
    test?: {
        fileName: string,
        fileDestination: string
    },
    any?: {
        fileName: string,
        fileDestination: string
    }
}
export interface EJSFolderInterface {
    relativePath: string,
    outputDestination: EJSFolderDestination,
    language?: Language
}
