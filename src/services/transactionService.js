const getByUserId = async (id, status = null) => {
    try {
        // build the having clause
        const query = status !== null ? `status='${status}'` : "status='pending'";

        return await Backendless.Data.of('transactions').find({
            where: `receiver='${id}' OR sender='${id}'`,
            having: query,
            relations: ['receiver', 'sender'],
            sortBy: ['created DESC'],
            pageSize: 10,
            offset: 0,
        });
    } catch (error) {
        throw new Error(error);
    }
};

const calcBalance = async (objectId, cardId, token) => {
    try {
        const unitOfWork = new Backendless.UnitOfWork();

        // Get the virtual card
        const cardQuery = Backendless.DataQueryBuilder.create();
        cardQuery.setWhereClause(`objectId = '${cardId}'`);
        const findCard = unitOfWork.find('mock-cards', cardQuery);

        // Create a query builder
        const incomeQuery = Backendless.DataQueryBuilder.create(token);
        // Set the where clause
        incomeQuery
            .setWhereClause(`receiver = '${objectId}' AND status='completed'`)
            .setProperties(['Sum(amount) as total']);
        // Find transaction sum for income
        const findIncome = unitOfWork.find('transactions', incomeQuery);

        // Create a query builder
        const outcomeQuery = Backendless.DataQueryBuilder.create(token);
        // Set the where clause
        outcomeQuery
            .setWhereClause(`sender = '${objectId}' AND status='completed'`)
            .setProperties(['Sum(amount) as total']);
        // Find transaction sum for outcome
        const findOutcome = unitOfWork.find('transactions', outcomeQuery);

        // Define the changes
        const changes = {
            income: findIncome.resolveTo(0, 'total'),
            outcome: findOutcome.resolveTo(0, 'total'),
        };
        // Update the card balance
        unitOfWork.update(findCard.resolveTo(0), changes).setOpResultId('balanceResult');

        // End of the transaction
        return unitOfWork.execute(token);
    } catch (error) {
        return error;
    }
};

const send = async (fullName, receiverId, amount, senderId, token) => {
    try {
        // Build the notification message
        const message = fullName + ' sent you ' + amount + ' BNG.';

        // Create a new unit of work
        const unitOfWork = new Backendless.UnitOfWork();

        // Create a new transaction
        const newTransaction = unitOfWork.create('transactions', {
            amount: Number(amount),
            status: 'completed',
        });

        // Create a notification
        const notification = unitOfWork.create('notifications', {
            message: message,
            type: 'transaction',
            related_entity_id: newTransaction,
            related_entity_name: 'transactions',
        });

        // Set the relations for the transaction
        unitOfWork.setRelation(newTransaction, 'receiver', [receiverId]);
        unitOfWork.setRelation(newTransaction, 'sender', [senderId]);

        // Set the relation for the receiver
        unitOfWork.setRelation(notification, 'userId', [receiverId]);

        // End of the transaction
        return unitOfWork.execute(token);
    } catch (error) {
        return new Error(error);
    }
};

const request = async (fullName, receiverId, amount, senderId, token) => {
    try {
        // Build the notification message
        const message = fullName + ' requested ' + amount + ' BNG.';

        const unitOfWork = new Backendless.UnitOfWork();

        // Create a new transaction
        const newTransaction = unitOfWork.create('transactions', { amount: Number(amount) });

        // Create a notification
        const notification = unitOfWork.create('notifications', {
            message: message,
            type: 'transaction',
            related_entity_id: newTransaction,
            related_entity_name: 'transactions',
        });

        // Set the relations for the transaction
        unitOfWork.setRelation(newTransaction, 'receiver', [receiverId]);
        unitOfWork.setRelation(newTransaction, 'sender', [senderId]);

        // Set the relations for the notification
        unitOfWork.setRelation(notification, 'userId', [receiverId]);

        // End of the transaction
        return unitOfWork.execute(token);
    } catch (error) {
        return new Error(error);
    }
};

export const transactionService = {
    send,
    getByUserId,
    calcBalance,
    request,
};
