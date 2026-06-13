export const communityMd = `# Community

ECP is an open protocol. The reference SDK, runtime, and specification are developed in the open on GitHub.

## Repository

The source for the spec, the Python SDK, the reference runtime, and every example manifest lives in a single repo.

- [evaluation-context-protocol/ecp](https://github.com/evaluation-context-protocol/ecp)

## Contributing

Issues, discussions, and pull requests are welcome — for the spec itself, for new graders, for additional framework adapters, or for runtime implementations in other languages.

- File an issue or RFC on GitHub for protocol changes.
- Open a PR against \`spec/\` for the normative specification, against \`runtime/\` for the reference CLI, or against \`sdk/\` for the Python SDK.
- Add an \`examples/<your_framework>_demo\` directory to contribute a new framework integration.

## Conformance

If you implement ECP in another runtime or language, validate it against the reference suite:

\`\`\`bash
ecp conformance --target "python examples/customer_support_demo/agent.py"
\`\`\`

## License

The protocol, schemas, SDK, and runtime are released under permissive open-source licenses. See the [repository](https://github.com/evaluation-context-protocol/ecp) for details.
`;
