import { Injectable } from '@nestjs/common';
import { integer } from 'aws-sdk/clients/cloudfront';
import { setting } from '../setting';
import { FileSystem } from '../shared/fileSystem';

const axios = require('axios');
axios.defaults.timeout = 15000;

@Injectable()
export class HttpService {
    async get(url: string) {
        return axios.get(url);
    }

    async put(url: string, data: object) {
        return axios.put(url, data);
    }

    async post(url: string, data: object) {
        return axios.post(url, data);
    }

    async delete(url: string) {
        return axios.delete(url);
    }

    async patch(url: string, data: object) {
        return axios.patch(url, data);
    }

    async sleep(milliseconds: integer) {
        return new Promise((resolve) => {
            setTimeout(resolve, milliseconds);
        });
    }


    async getAndSaveResponse(url: string, filename: string) {
        let msg: string = '';
        try {
            const axios2 = require('axios');
            axios2.defaults.timeout = 3600000; // 1 hour
            let res = await axios2.get(url);
            if (res && res.data) {
                let content;
                let countStr: string = '; count:';
                if (res.data.Items) {
                    content = JSON.stringify(res.data.Items);
                    countStr += res.data.Count ? + res.data.Count : 'N/A';
                }

                else
                    content = JSON.stringify(res.data);

                let fs = new FileSystem();
                fs.SaveSync(filename, content);
                msg = 'done! filename is ' + filename + countStr;
            }
            else
                msg = 'unable to response';
        }
        catch (err) {
            msg = 'ERROR:' + err;
        }
        return msg;
    }
}
