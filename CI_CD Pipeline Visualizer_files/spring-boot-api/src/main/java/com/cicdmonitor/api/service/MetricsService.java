package  com.cicdmonitor.api.service;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.HashMap;

@Service
public class MetricsService {
    
    public Map<String, Object> calculateDoraMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("deploymentFrequency", "2.5 per day");
        metrics.put("leadTimeForChanges", "4.2 hours");
        metrics.put("changeFailureRate", "8.3%");
        metrics.put("meanTimeToRecovery", "1.8 hours");
        return metrics;
    }
}
 