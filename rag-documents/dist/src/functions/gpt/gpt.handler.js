"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const s3_resolver_1 = require("../../resolvers/s3.resolver");
const gpt_1 = require("./gpt");
const useCaseResolver = () => {
    const s3 = (0, s3_resolver_1.s3Resolver)();
    return new gpt_1.GPTRag(s3);
};
const handler = async (event, _, callback) => {
    const useCase = useCaseResolver();
    try {
        console.log('event', event);
        const { body } = event;
        const { query } = JSON.parse(body || '{}');
        await useCase.execute(query);
        return callback(null);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3B0LmhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZnVuY3Rpb25zL2dwdC9ncHQuaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2REFBd0Q7QUFDeEQsK0JBQThCO0FBRTlCLE1BQU0sZUFBZSxHQUFHLEdBQUcsRUFBRTtJQUMzQixNQUFNLEVBQUUsR0FBRyxJQUFBLHdCQUFVLEdBQUUsQ0FBQTtJQUN2QixPQUFPLElBQUksWUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQTtBQUVNLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFVLEVBQUUsQ0FBTSxFQUFFLFFBQWEsRUFBRSxFQUFFO0lBQ2pFLE1BQU0sT0FBTyxHQUFHLGVBQWUsRUFBRSxDQUFBO0lBRWpDLElBQUk7UUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUMzQixNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFBO1FBQ3RCLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQTtRQUUxQyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFNUIsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdkI7SUFBQyxPQUFPLEtBQVUsRUFBRTtRQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3BCLE1BQU0sS0FBSyxDQUFBO0tBQ1o7QUFDSCxDQUFDLENBQUE7QUFmWSxRQUFBLE9BQU8sV0FlbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzM1Jlc29sdmVyIH0gZnJvbSBcIi4uLy4uL3Jlc29sdmVycy9zMy5yZXNvbHZlclwiXG5pbXBvcnQgeyBHUFRSYWcgfSBmcm9tIFwiLi9ncHRcIlxuXG5jb25zdCB1c2VDYXNlUmVzb2x2ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHMzID0gczNSZXNvbHZlcigpXG4gIHJldHVybiBuZXcgR1BUUmFnKHMzKVxufVxuXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIChldmVudDogYW55LCBfOiBhbnksIGNhbGxiYWNrOiBhbnkpID0+IHtcbiAgY29uc3QgdXNlQ2FzZSA9IHVzZUNhc2VSZXNvbHZlcigpXG5cbiAgdHJ5IHtcbiAgICBjb25zb2xlLmxvZygnZXZlbnQnLCBldmVudClcbiAgICBjb25zdCB7IGJvZHkgfSA9IGV2ZW50XG4gICAgY29uc3QgeyBxdWVyeSB9ID0gSlNPTi5wYXJzZShib2R5IHx8ICd7fScpXG5cbiAgICBhd2FpdCB1c2VDYXNlLmV4ZWN1dGUocXVlcnkpXG5cbiAgICByZXR1cm4gY2FsbGJhY2sobnVsbCk7XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgIHRocm93IGVycm9yXG4gIH1cbn1cbiJdfQ==