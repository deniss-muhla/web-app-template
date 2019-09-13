// tslint:disable
/**
 * Swagger Petstore
 * This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.
 *
 * The version of the OpenAPI document: 1.0.1
 * Contact: apiteam@swagger.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

// tslint:disable
/* eslint-disable */

import moment from 'moment';
import { exists, mapValues } from '../runtime';
/**
 *
 * @export
 * @interface ModelApiResponse
 */
export interface ModelApiResponse {
    /**
     *
     * @type {number}
     * @memberof ModelApiResponse
     */
    code?: number;
    /**
     *
     * @type {string}
     * @memberof ModelApiResponse
     */
    type?: string;
    /**
     *
     * @type {string}
     * @memberof ModelApiResponse
     */
    message?: string;
}

export function ModelApiResponseFromJSON(json: any): ModelApiResponse {
    return {
        code: !exists(json, 'code') ? undefined : json['code'],
        type: !exists(json, 'type') ? undefined : json['type'],
        message: !exists(json, 'message') ? undefined : json['message']
    };
}

export function ModelApiResponseMapFromJSON(json: any): { [key: string]: ModelApiResponse } {
    return mapValues(json, ModelApiResponseFromJSON);
}

export function ModelApiResponseToJSON(value?: ModelApiResponse): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        code: value.code,
        type: value.type,
        message: value.message
    };
}