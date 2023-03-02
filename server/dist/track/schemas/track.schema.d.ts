import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export type TrackDocument = Track & Document;
export declare class Track {
    name: string;
    artist: string;
    text: string;
    listens: number;
    picture: string;
    audio: string;
    comments: Comment[];
}
export declare const TrackSchema: mongoose.Schema<Track, mongoose.Model<Track, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Track>;
