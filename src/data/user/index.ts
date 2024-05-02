import { UserModel } from "../../db/user";
export interface User{
    chatId: string
    firstName: string
    lastName: string
    username: string
}
export class UserService {
    public static async saveUser(data: User): Promise<void> {
        try {
            const isExists = await UserService.isDataExists(data.chatId);
            if (isExists) {
                console.log('Data with id', data.chatId, 'already exists.');
                return;
            }

            const carDocument = new UserModel(data);
            const result = await carDocument.save();
            // console.log('Data inserted:', result._id);
        } catch (error) {
            console.error('Error saving data to MongoDB:', error);
            throw new Error('Failed to save data to MongoDB');
        }
    }

    private static async isDataExists(chatId: string): Promise<boolean> {
        try {
            const result = await UserModel.findOne({ chatId: chatId });
            return !!result;
        } catch (error) {
            // console.error('Error checking data existence in MongoDB:', error);
            throw new Error('Failed to check data existence in MongoDB');
        }
    }
}