import {UserProfile} from "./UserProfile";

/**
 * Dobrą praktyką jest uniezależnić się od bazy danych stosując warstwę abstrakcji jaką jest interfejs. Dzięki temu np. możemy podmienić łatwo bazę danych na implementację w pamięci i nie potrzebujemy
 * mongoDB do uruchomienia.
 */
export interface UserProfileRepository {
    findByUsername(username: string): Promise<UserProfile>

    save(userProfile: UserProfile): Promise<UserProfile>
}
