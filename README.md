# Continuum

> State that sticks, remembered.

Continuum is an open-source persistence layer for services that need useful memory between interactions. It distills long conversations into structured records, connects related context, and retrieves the right information when it matters.

[Visit continuum-memory.xyz](https://continuum-memory.xyz/) · [Read the documentation](https://continuum-memory.xyz/#sdk)

## What Continuum provides

- **Automatic distillation** — turn long interaction logs into compact, useful records.
- **Observable memory** — inspect what was stored, when it was created, what triggered retrieval, and its relevance score.
- **Scoped access control** — scope records by user, session, service, or custom namespace.
- **Multi-signal retrieval** — combine semantic similarity, recency, and relational context for stronger recall.
- **Compliance-ready controls** — support for customer-managed encryption keys and data residency choices.
- **TTL and decay** — let records expire, strengthen through access, or age naturally.
- **Shared scopes** — let one service write context while downstream services read it.
- **Drop-in SDKs** — Python and Node.js packages, a REST API, and integrations for popular orchestration frameworks.

## Quick start

Install the SDK that matches your service, or run the self-hosted server:

~~~bash
pip install continuum-ai
# or
npm install continuum-ai
# or
Docker run -p 8282:8282 continuum/server
~~~

Store context as it happens and recall it later:

~~~python
from continuum import Client

client = Client()
client.add("prefers dark roast, no sugar", scope="user_alice")

results = client.search("coffee preferences", scope="user_alice")
print(results)
~~~

## How it works

1. **Install** the SDK or self-host the server.
2. **Remember** useful context as interactions happen; Continuum extracts and deduplicates what matters.
3. **Recall** relevant records with semantic search, recency weighting, and relational context.

## Integrations

Continuum is designed to work with the tools teams already use, including LangChain, CrewAI, AutoGen, the Vercel AI SDK, LlamaIndex, and any client that can call its REST API.

## Project links

- Website: [continuum-memory.xyz](https://continuum-memory.xyz/)
- Documentation and SDK reference: [continuum-memory.xyz/#sdk](https://continuum-memory.xyz/#sdk)
- REST API overview: [continuum-memory.xyz/#api](https://continuum-memory.xyz/#api)
- Issues and feature requests: [GitHub Issues](https://github.com/continuum-memory/continuum/issues)

## License

Continuum is released under the [MIT License](LICENSE).
