const { connection } = require('../models/connection');

module.exports.runInTransaction = async (asyncFunc) => {

    const session = await connection.startSession();
    session.startTransaction()
    try {
        await asyncFunc(session);
        // Commit the changes
        await session.commitTransaction();
        console.log('Success');
    } catch (error) {
        await session.abortTransaction();

        // logging the error
        // console.error(error);
        // jdi kono ta error dey  sathe sathe seta rethrow hobe.sathe oitar nam o thakbe. orFail() dia kora jabe
        // Rethrow the error
        throw error;
    } finally {
        console.log('ending');
        session.endSession();
    }

}