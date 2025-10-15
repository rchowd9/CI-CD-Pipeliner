package  com.cicdmonitor.api.service;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.HashMap;

@Service
public class RepositoryService {
    
    public Map<String, Object> syncWithGitHub(String repoUrl) {
        Map<String, Object> result = new HashMap<>();
        result.put("status", "success");
        result.put("message", "Repository synced successfully");
        result.put("repoUrl", repoUrl);
        result.put("lastSync", System.currentTimeMillis());
        return result;
    }
}
 