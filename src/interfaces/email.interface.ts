export interface IEmailBody {
    receiver: string;
    subject: string;
    body: string;
    templateKey: string;
    data?: any;
}
