import { cardService } from '../services/cardGenerationService'

export const setNewGeneratedId = async () => {
    let newCardId
    let checkMatch = true
    while (checkMatch) {
        newCardId = Math.floor(Math.random() * 100) + 1
        const getUsersCardIds = await cardService.getVirtualcardIds()
        const usersCardIds = getUsersCardIds.map((id) => id.cardId)
        checkMatch = usersCardIds.includes(newCardId)
    }
    return newCardId
}
