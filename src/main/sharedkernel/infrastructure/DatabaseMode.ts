/**
 * EXPLANATION
 * Wybór bazy danych nie powinien wpływać na kod logiki biznesowej naszego systemu.
 * Baza danych to jedynie tzw. "szczegół implementacyjny". Dlatego jej wybór można nawet przesunąć do
 * ostatniego odpowiedniego momentu (ang. last responsible moment), a skupić się na działaniu aplikacji.
 * Kod logiki nie powinien zależeć od bazy danych, dlatego wprowadza się odwrócenie zależności (ang. dependency inversion principle),
 * poprzez zastosowanie interfejsów. To kod obsługujący zapisywanie w bazie danych zależy teraz od kodu logiki (interfejs Repository).
 */
export enum DatabaseMode {
    IN_MEMORY_LISTS = "in_memory",
    EMBEDDED_MONGODB = "embedded_mongo",
    EXTERNAL_MONGODB = "external_mongo"
}

export function databaseModeFrom(name: string): DatabaseMode {
    switch (name) {
        case DatabaseMode.IN_MEMORY_LISTS:
            return DatabaseMode.IN_MEMORY_LISTS;
        case DatabaseMode.EMBEDDED_MONGODB:
            return DatabaseMode.EMBEDDED_MONGODB;
        case DatabaseMode.EXTERNAL_MONGODB:
            return DatabaseMode.EXTERNAL_MONGODB;
        default:
            throw new Error("Invalid database mode: " + name)
    }
}
