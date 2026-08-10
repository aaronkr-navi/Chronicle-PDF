package Chronicle.software.proprietary.mcp.tools;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import Chronicle.software.proprietary.mcp.catalog.McpToolCatalog;
import Chronicle.software.proprietary.mcp.catalog.OperationCategory;

import tools.jackson.databind.ObjectMapper;

/** Exposes the {@code /api/v1/security/*} namespace as a single MCP tool. */
@Component
@ConditionalOnProperty(name = "mcp.enabled", havingValue = "true")
public class ChronicleSecurityTool extends AbstractCategoryTool {

    public ChronicleSecurityTool(
            ObjectMapper mapper,
            ObjectProvider<McpToolCatalog> catalog,
            ObjectProvider<McpOperationExecutor> executor) {
        super(mapper, catalog, executor);
    }

    @Override
    public String name() {
        return "chronicle_security";
    }

    @Override
    public String description() {
        return "Security-related PDF operations: password add/remove, redact, sanitize, certify"
                + " / sign with cert, validate signature, add watermark. Call"
                + " chronicle_describe_operation with the chosen op to get its parameters schema"
                + " before invoking this tool.";
    }

    @Override
    protected OperationCategory category() {
        return OperationCategory.SECURITY;
    }
}
