// Generated code from Butter Knife. Do not modify!
package com.haerul.foodsapp.adapter;

import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.CallSuper;
import androidx.annotation.UiThread;
import butterknife.Unbinder;
import butterknife.internal.Utils;
import com.haerul.foodsapp.R;
import java.lang.IllegalStateException;
import java.lang.Override;

public class RecyclerViewMealByCategory$RecyclerViewHolder_ViewBinding implements Unbinder {
  private RecyclerViewMealByCategory.RecyclerViewHolder target;

  @UiThread
  public RecyclerViewMealByCategory$RecyclerViewHolder_ViewBinding(
      RecyclerViewMealByCategory.RecyclerViewHolder target, View source) {
    this.target = target;

    target.mealThumb = Utils.findRequiredViewAsType(source, R.id.mealThumb, "field 'mealThumb'", ImageView.class);
    target.mealName = Utils.findRequiredViewAsType(source, R.id.mealName, "field 'mealName'", TextView.class);
  }

  @Override
  @CallSuper
  public void unbind() {
    RecyclerViewMealByCategory.RecyclerViewHolder target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");
    this.target = null;

    target.mealThumb = null;
    target.mealName = null;
  }
}
